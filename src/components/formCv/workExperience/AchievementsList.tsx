import { CirclePlus, Trash2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { AchievementBase } from '@/types/Achievement';
import Textarea from '@/components/Textarea';

interface Props {
    achievements: AchievementBase[];
    addAchievement : () => void,
    updateAchievementDescription : (index: number, achievementItem: AchievementBase,  newAchievementDescription: AchievementBase['description']) => void,
    removeAchievement: (index: number) => void,
}

export default function AchievementsList({ 
    achievements, 
    addAchievement, 
    updateAchievementDescription, 
    removeAchievement,
}: Props ){

    return (
        <div>
            <div className='flex justify-between mb-3 border-b pb-2'>
                <h4 className='text-xl font-bold'>Logros</h4>
                <Button onClick={addAchievement} >
                    <CirclePlus />
                    Agregar
                </Button>
            </div>
            <div className=''>
                <ul className='list-none'>
                    { achievements.map((achievement, index) => (
                        <li key={index}>
                            <div className='flex align-middle gap-4'>
                                <Textarea
                                    classNameParent="w-full py-1"
                                    placeholder={ 'Achievement #' + (index + 1) + '...'}
                                    value={achievement.description}
                                    onChange={ e => updateAchievementDescription(index, achievement, e.target.value) }
                                />
                                <div className='grid place-items-center'>
                                    <Button variant={'destructive'} onClick={ () => removeAchievement(index) } >
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    )
}
